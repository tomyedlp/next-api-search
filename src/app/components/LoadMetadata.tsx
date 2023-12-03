import { Metadata, ResolvingMetadata } from 'next'
import axios from "axios"

type Props = {
    id: number | null | undefined,
    url: string,
  }
   
  export async function generateMetadata(
    Props: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
  
    const content = await axios.get(Props.url+Props.id).then((res) => res.json())
   
    return {
      title: content.title,
    }
  }

