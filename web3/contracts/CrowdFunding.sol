// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description; //Description of Campaign
        uint256 target; //Target value we want to achieve
        uint256 deadline; //Deadline to collect amount 
        uint256 amountCollected;
        string image;
        address[] donators; //Address of all the donators
        uint256[] donations; //Array to store all donations
    }

    mapping(uint256 => Campaign) public campaigns; //Same as campaign[0]

    uint256 public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _title, string memory _description, 
    uint256 _target, uint _deadline, string memory _image) public returns(uint256){ 
    //As this function will be added to the frontend, we will make it public and it will return the id of the campaign
    //To know the parameter is just for this function we use '_' before name of parameter
        Campaign storage campaign = campaigns[numberOfCampaigns];

        //is everything okay??
        require(campaign.deadline < block.timestamp, "The deadline should be a date in future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        //Contain index of the most newly created campaign
        return numberOfCampaigns - 1; 
    }

    function donateToCampaign(uint256 _id) public payable{
    //The function takes campaign id as parameter and it is of type payable which means we can pay using our crypto wallet. 
       
        uint256 amount = msg.value; //This is what we will send from our frontend.

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender); //Push address of sender in donators array
        campaign.donations.push(amount); //Push amount that is sent by sender in donations array

        (bool sent,) = payable(campaign.owner).call{value : amount}("");  //payable takes two arguements that why we used "," in declaring bool components.

        if(sent) {
            campaign.amountCollected += amount;
        }
    }

    function getDonators(uint _id) view public returns (address[] memory, uint[] memory){
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory){ //Returns all campaigns
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i]; //Create item variable to fetch the current campaign from storage

            allCampaigns[i] = item; //Store the Campaigns in the allCampaigns array
        }

        return allCampaigns;
    }
}