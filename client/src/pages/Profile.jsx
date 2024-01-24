import React, { useState, useEffect } from 'react'

import { useStateContext} from '../context';

import {DisplayCampaigns} from '../components'
const Profile = () => { //Same as Home page

  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]); 
  //We set campaigns in state bcz we need to fetch the campaign from smart contract
  const { address, contract, getUserCampaigns } = useStateContext();
  
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();//getCampaigns is an async function so we cannot call it immediately in useEffect so we create another function 'fetchCampaigns' to do the job
  },[address, contract]);//it has a callback function and a dependency array which ensures that the contract is present there before we try to make a call 
  
  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Profile