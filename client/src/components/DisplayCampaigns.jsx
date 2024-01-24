import React from 'react'
import {useNavigate} from 'react-router-dom' //Used to navigate between different campaigns
import {loader} from '../assets'
import {FundCard} from '../components' // we can also use './FundCard' to import

const DisplayCampaigns = ({title, isLoading, campaigns}) => { //We are passing title, isLoading, campaigns as props to the DisplayCampaigns it is done by using {}
    
    const navigate = useNavigate();
    
    const handleNavigate = (campaign) => {
      navigate(`/campaign-details/${campaign.title}`, {state:
        campaign}) //We are passing state as second parameter through routing which will pass state as an entire campaign
    }

  
    return (
    <div>
      <h1 className='font-epilogue font-semibold text-white text-left text-[18px]'>
        {title} ({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader} alt='loader' className='w-[100px] h-[100px] object-contain'
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className='font-epilogue font-semibold text-[#818183] text-[15px] leading-[30px]'>You have not created any campaigns yet</p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard
          key={campaign.id}
          {...campaign}
          handleClick = {() => handleNavigate(campaign)}//this is just to increase code readability
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns