import { Icon } from "@iconify/react";
import { useState } from "react";

const ChallengesGrid = () => {
    const [challenges, setChallenges] = useState([]);
    
  return (
    <section className="h-[calc(100dvh-20rem)]">
        <div className="flex flex-col items-center justify-center w-full h-full">
            <p className="text-lg text-default-400">No challenges found</p>
            <Icon icon="solar:ghost-broken" className="text-default-400 opacity-20" width={300} />
        </div>
    </section>
  )
}

export default ChallengesGrid