"use client"

import Image from 'next/image';
import toast from 'react-hot-toast';
import { Button } from '@nextui-org/react';
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'

const WorldCoinConnect = () => {
    const verifyProof = async (proof) => {
        toast.error("Verification failed. Please try again.")
    };
    
    const onSuccess = () => {
        toast.success("Verification successfull!")
    };
  

  return (
    <div className='flex items-center justify-start basis-[50%]'>
        <IDKitWidget
            app_id="app_staging_82f5386311a13c524bb95ff3a04e7c61"
            action="create-hold-habit"
            false
            verification_level={VerificationLevel.Device}
            handleVerify={verifyProof}
            onSuccess={onSuccess}>
            {({ open }) => (
                <Button 
                    className="p-[1.7rem] bg-foreground font-medium text-background" 
                    onClick={open}
                    endContent={
                        <Image
                            src="/worldcoin-icon.png"
                            width={24}
                            height={24}
                            alt="WorldCoin Icon"
                        />
                    }
                >
                    WorldCoin
                </Button>
            )}
        </IDKitWidget>
    </div>
  )
}

export default WorldCoinConnect