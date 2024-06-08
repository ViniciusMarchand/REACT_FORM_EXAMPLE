'use client';
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";

export default function DatePicker(props:{setValue:any}) {
    const {setValue} = props;
    const [date, setDate] = useState<any>(new Date());

    useEffect(() => {
        setValue("publicationDate", date);
    },[date, setValue]);
    
    return (
        <Popover>
        <PopoverTrigger asChild className="w-full">
        <Button
            variant={"outline"}
            className={cn(
            "w-full justify-start text-left font-normal h-[50px]",
            !date && "text-muted-foreground"
            )}
        >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", {locale: ptBR}) : <span>Insira a data da publicação da notícia</span>}
        </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            locale={ptBR}
        />
        </PopoverContent>
    </Popover> 
    );
}