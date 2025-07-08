import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialNames = [
  "Petish", "Petino", "Peteto", "PetPoP", "HappyPet", "Petology", "PetParty", "Petban",
  "Petgram", "Petzilla", "Digipet", "Petchi", "Petbaz", "Petestan", "Pettool", "Petinja",
  "Petdooni", "Petjan", "Petjoon", "Petgoli", "Petiman", "Petloos", "Petshad", "PetFun",
  "Pettoon", "petziii", "pettop", "Petpof", "Pettopoli", "Pettopol", "Petpof", "Pofipet",
  "Babapet", "Petyar", "Petkhan", "Petoolak"
];

export default function VotingApp() {
  const [names, setNames] = useState(() => initialNames.map(name => ({ name, scores: [] })));
  const [newName, setNewName] = useState("");
  const [votes, setVotes] = useState({});
  const [error, setError] = useState("");

  const handleVote = (name, score) => {
    setVotes({ ...votes, [name]: score });
    setError("");
  };

  const handleSaveVotes = () => {
    const missingVotes = names.filter(n => !votes[n.name]).map(n => n.name);
    if (missingVotes.length > 0) {
      setError(
        <div className="bg-red-800 text-white p-4 rounded-xl space-y-2">
          <p>لطفاً به این اسم‌ها امتیاز بدهید:</p>
          <div className="flex flex-wrap gap-2">
            {missingVotes.map((name) => (
              <span key={name} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">{name}</span>
            ))}
          </div>
        </div>
      );
      return;
    }
    const updatedNames = names.map(n => ({
      ...n,
      scores: [...n.scores, votes[n.name]]
    }));
    setNames(updatedNames);
    setVotes({});
    setError(<div className="bg-green-800 text-white p-4 rounded-xl">امتیازها با موفقیت ثبت شد.</div>);
  };

  const handleAddName = () => {
    if (!newName.trim()) return;
    setNames([{ name: newName, scores: [] }, ...names]);
    setNewName("");
  };

  const getTop3 = () => {
    return [...names]
      .map(n => ({ name: n.name, total: n.scores.reduce((a, b) => a + b, 0) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 3);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 text-white min-h-screen">
      <div className="flex gap-2">
        <Input placeholder="اضافه کردن نام جدید" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <Button onClick={handleAddName} className="bg-green-600 hover:bg-green-700 text-white font-bold">اضافه کن</Button>
      </div>

      <div className="bg-gray-800 text-gray-100 p-4 rounded-xl">
        <h3 className="text-lg font-bold mb-2">راهنمای امتیازدهی به اسم‌ها:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>ساده و راحت‌الحفظ باشد.</li>
          <li>با حوزه کاری برند مرتبط باشد.</li>
          <li>تلفظ راحت و بدون ابهام داشته باشد.</li>
          <li>منحصر به فرد و قابل متمایز شدن باشد.</li>
          <li>حس مثبت و دوستانه القا کند.</li>
          <li>چاشنی طنز داشته باشد.</li>
          <li>درگیری ذهنی ایجاد کند و در حافظه بماند.</li>
          <li>دامنه وبسایت ir و آیدی اینستاگرام آن آزاد باشد.</li>
        </ul>
      </div>

      <Button onClick={handleSaveVotes} className="bg-green-600 hover:bg-green-700">ثبت امتیازها</Button>
      {error && <div className="mt-4">{error}</div>}

      <h2 className="text-xl font-bold">۳ اسم برتر</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getTop3().map(({ name, total }) => (
          <Card key={name} className="bg-gradient-to-br from-[#141E30] to-[#243B55] text-white rounded-2xl shadow-xl">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="text-3xl font-extrabold mb-4 tracking-wide uppercase">{name}</div>
              <div className="font-mono text-4xl bg-gray-900 text-lime-400 px-6 py-3 rounded-lg shadow-inner">{total}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-bold">رأی‌گیری برای اسم‌ها</h2>
      <div className="grid gap-6">
        {names.map(({ name }) => (
          <Card key={name} className="bg-gray-800">
            <CardContent className="space-y-2">
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-2xl text-lg font-bold mb-2 min-w-[250px] text-center">{name}</div>
              </div>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((score) => (
                  <Button key={score} onClick={() => handleVote(name, score)} variant={votes[name] === score ? "default" : "outline"}>{score}</Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
