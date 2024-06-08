'use client'

import DatePicker from "@/components/DatePicker";
import Header from "@/components/Header"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState<Date>();

  return (
   <div>
    <Header/>
    <main className="w-full py-5 px-[100px]">
      <h1 className="text-[30px] font-bold mb-20">Entenda o caso</h1>
      <form>
        <div className="flex flex-col mb-5">
          <label className="text-[20px] mb-5">Data de publicação da notícia</label>
          <DatePicker/>
      </div>
      <div className="flex flex-col mb-5">
          <label htmlFor="description" className="text-[20px] mb-1">Descreva o caso em poucas palavras</label>
          <Textarea id="description" placeholder="Inclua informações básicas: o que aconteceu, com quem aconteceu, onde aconteceu, quando aconteceu e por que aconteceu." className="focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 min resize-none h-[280px]"/>
      </div>
      <div className="flex flex-col mb-5">
          <label htmlFor="description" className="text-[20px] mb-1">Contexto e informação adicional</label>
          <Textarea id="description" placeholder="Informações relevantes podem incluir dados relevantes para a economia brasileira ou algum setor industrial em específico, apurações adicionais e/ou análises de conjuntura entre outras." className="focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 min resize-none h-[280px]"/>
      </div>
      <div className="flex flex-col mb-5">
          <label htmlFor="description" className="text-[20px] mb-1">Parte/Fonte:</label>
          <Input id="description" placeholder="Insira a fonte ou parte envolvida..." className="focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 min resize-none h-[50px]"/>
      </div>
      <div className="flex flex-col mb-5">
          <label htmlFor="description" className="text-[20px] mb-1">Por que entender o caso em questão importa?</label>
          <Textarea id="description" placeholder="Explique de forma sucinta por que o caso é relevante para o leitor." className="focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 min resize-none h-[280px]"/>
      </div>
      <div className="flex flex-col mb-2">
          <label htmlFor="description" className="text-[20px] mb-1">Deseja incluir um link para um vídeo do Youtube?</label>
          <Input id="description" placeholder="Insira o Link completo ex: https://www.google.com/" className="focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 min resize-none h-[50px]"/>
      </div>
      <Button className="mb-5 bg-[#abffb3] font-bold text-black text-[18px] hover:bg-[#74c27c]">Gerar <Send className="ml-2"/></Button>
      </form>
      <hr />
      <div className="flex flex-col my-5">
          <label htmlFor="description" className="text-[30px] mb-1 font-bold">Saídas geradas</label>
          <Textarea id="description" className="focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 min resize-none h-[280px]" readOnly/>
      </div>
    </main>
   </div>
  );
}
