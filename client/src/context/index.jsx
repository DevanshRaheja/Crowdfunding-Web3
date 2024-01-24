import React, {useContext, createContext} from "react";

import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react";
import {ethers} from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => { // Wrap our app as the context provider but still render children that are inside of it
    const { contract, isLoading, error } = useContract
    ("0x2A0B06B7DaB4Adc9302B10e6aFB49D0EF4Ccc304");

    //there are two ways to call the write functions in our smart contract

    const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign');

    //or you can use contract.call() and pass everything you need

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {

        try {
            const data = await createCampaign({args:[
            address, //owner who is creating this campaign
            form.title, //title of the campaign
            form.description, //description
            form.target, //goal
            new Date(form.deadline).getTime(),  //gives us access to seconds passed since 1970
            form.image
        ]})
            console.log("contract call success", data)
        } catch (error) {
            console.log("contract call failure", error);
        }

       
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');
        // console.log(campaigns)
        
        //We need to covert the campaign data into human readable form 
        const parsedCampaigns= campaigns.map((campaign, i) => ({ // We are instantly returning an object using '() => ({})'
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pid: i
        }));
        return parsedCampaigns;
    }   

    const donate = async (pid,amount) => {
        const data = await contract.call('donateToCampaign', [pid], // This line created error and resolved by using [pid]
        {
            value: ethers.utils.parseEther(amount)
        }); 

        return data;
    }

    const getDonations = async (pid) => {
        const donations = await contract.call('getDonators', [pid]);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }
        return parsedDonations;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredCampaigns = allCampaigns.filter((campaign) =>
            campaign.owner === address);

            return filteredCampaigns;
        }
    

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign : publishCampaign, //renaming publishCampaign to createCampaign
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations
            }} 
            //Everything we need to share across all of our components
        >
            {children}
        </StateContext.Provider>
    )
}

//create a custom hook to utilize that context
export const useStateContext = () => useContext(StateContext);
