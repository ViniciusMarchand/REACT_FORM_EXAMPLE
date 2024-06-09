'use client'

import DatePicker from "@/components/DatePicker";
import Header from "@/components/Header"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formInputs } from "@/global/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Copy, Send } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"

export default function Home() {
  const [result, setResult] = useState("")
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    
  } = useForm<formInputs>({  
    defaultValues: {
    publicationDate: format(new Date(), "PPP", {locale: ptBR}),
  }})
  
  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    const { description, context, source, relevance, youtubeLink, publicationDate } = data;


    const res = `Descrição: ${description}\nContexto: ${context}\nFonte: ${source}\nRelevância: ${relevance}\nData de publicação: ${publicationDate} ${youtubeLink !== "" && `\nLink do Youtube: ${youtubeLink}`} \n=================\n Ordem alfabética:\n`;

    const allStrings = description + " " + context + " " + source + " " + relevance + " " + youtubeLink;
    const allWords = allStrings.replace(/[0-9]/g, "").split(" ");
    const orderedWords = allWords.sort();

    setResult(res + orderedWords.join(" "));
    fetch("/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(res => console.log("News sent"))
    .catch(error => console.log(error))
    .finally(() => reset())
  };

  return (
   <div>
    <Header/>
    <main className="w-full py-5 px-[100px]">
      <h1 className="text-[30px] font-bold mb-20">Entenda o caso</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-5">
          <label className="text-[20px] mb-5">Data de publicação da notícia</label>
          <DatePicker setValue={setValue}/>
      </div>
      <div className="flex flex-col mb-5">
          <label htmlFor="description" className="text-[20px] mb-1">Descreva o caso em poucas palavras</label>
          <Textarea id="description" placeholder="Inclua informações básicas: o que aconteceu, com quem aconteceu, onde aconteceu, quando aconteceu e por que aconteceu." className="focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 min resize-none h-[280px]" 
          required {...register("description")}/>
      </div>
      <div className="flex flex-col mb-5">
          <label htmlFor="context" className="text-[20px] mb-1">Contexto e informação adicional</label>
          <Textarea id="context" placeholder="Informações relevantes podem incluir dados relevantes para a economia brasileira ou algum setor industrial em específico, apurações adicionais e/ou análises de conjuntura entre outras." className="focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 min resize-none h-[280px]" 
          required {...register("context")}/>
      </div>
      <div className="flex flex-col mb-5">
          <label htmlFor="source" className="text-[20px] mb-1">Parte/Fonte:</label>
          <Input id="source" placeholder="Insira a fonte ou parte envolvida..." className="focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 min resize-none h-[50px]" 
          required {...register("source")}/>
      </div>
      <div className="flex flex-col mb-5">
          <label htmlFor="relevance" className="text-[20px] mb-1">Por que entender o caso em questão importa?</label>
          <Textarea id="relevance" placeholder="Explique de forma sucinta por que o caso é relevante para o leitor." className="focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 min resize-none h-[280px]" 
          required {...register("relevance")}/>
      </div>
      <div className="flex flex-col mb-2">
          <label htmlFor="youtubeLink" className="text-[20px] mb-1">Deseja incluir um link para um vídeo do Youtube?</label>
          <Input id="youtubeLink" placeholder="Insira o Link completo ex: https://www.google.com/" className="focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 min resize-none h-[50px]" 
          pattern="^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$"
          {...register("youtubeLink")}/>
      </div>
      <Button className="mb-5 bg-[#abffb3] font-bold text-black text-[18px] hover:bg-[#74c27c]">Gerar <Send className="ml-2"/></Button>
      </form> 
      <hr />
      <div className="flex flex-col my-5">
          <label htmlFor="res" className="text-[30px] mb-1 font-bold">Saídas geradas</label>
          <div className="relative top-10 right-4">
            <Copy className="float-right cursor-pointer" onClick={(e) => navigator.clipboard.writeText(result)} />
          </div>
          <Textarea id="res" className="focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 min resize-none h-[280px]" readOnly required value={result}/>
      </div>
    </main>
   </div>
  );
}
