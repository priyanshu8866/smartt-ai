// Remove this import line
 import ChatCompletionRequestMessage from "openai";

import * as z from "zod";
import axios from "axios";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
//import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";
import useClient  from 'next/client';


const CodePage = () => {
  const router = useRouter();
  const proModal = useProModal();
 //const [messages, setMessages] = useClient<ChatCompletionRequestMessage[]>([]);
//useClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  interface ChatCompletionRequestMessage {
    role: string;
    content: string;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
     // const newMessages = [...messages, userMessage];

      //const response = await axios.post('/api/code', { messages: newMessages });
     // setMessages((current: any) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  }
  return (
    <div>
      {/* ... rest of your component code */}
    </div>
  );
}

 
export default CodePage;
