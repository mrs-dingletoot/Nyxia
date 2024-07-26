import { ButtonPrimary } from "@/components/Buttons";
import { ButtonSecondary } from "@/components/Buttons";
import { Header2, Header3, HeaderBig } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import "styles/glitch.css";

export default function NotFound() {
 return (
  <div className="before:md:bg-grid-[#fff] relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-4 before:absolute before:z-10 before:h-full before:w-full before:opacity-5 before:grayscale">
   <div className="absolute left-0 top-0 z-10 h-full w-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
   <div className="z-30">
    <div className="flex flex-col items-center justify-center">
     <HeaderBig title="err" className="glitch relative">
      err
     </HeaderBig>
    </div>
    <Header2 className="justify-center">Hm.. seems like this is not where you was planning to be, right?</Header2>
    <Header3 className="text-center font-normal opacity-50">Well we are sorry you couldn't reach your intended destination but you have a few options on what to do now while you are here I guess <br /> Or you can just sit here in the peace and quiet for a little while. Up to you what you want to do really 🤷</Header3>
    
    <div className="mt-4 flex flex-wrap justify-center gap-2">
    <ButtonPrimary href="/discord">
      <Icons.help className={iconVariants({ variant: "button" })} /> Contact support
     </ButtonPrimary>
     <ButtonPrimary href="/">
      <Icons.arrowLeft className={iconVariants({ variant: "button" })} />
      Homepage
     </ButtonPrimary>
    </div>
    
    <br />

    <div className="mt-4 flex flex-wrap justify-center gap-2">
     <ButtonSecondary href="https://www.youtube.com/">
      <Icons.externalLink className={iconVariants({ variant: "button" })} /> Go watch YouTube
     </ButtonSecondary>
     <ButtonSecondary href="https://discord.com/channels/@me">
      <Icons.externalLink className={iconVariants({ variant: "button" })} /> Back to Discord
     </ButtonSecondary>
    </div>

   </div>
  </div>
 );
}
