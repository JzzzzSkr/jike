// Encapsulate the logic for fetching channel lists
import { useState, useEffect } from "react";
import { getChannelAPI } from "@/apis/article";

function useChannel() {
  // 1. Logic to fetch the list of channels
  // Get the channel list
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    // 1. Encapsulate a function and call the API inside the function
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    // 2. Call the function
    getChannelList();
  }, []);

  // 2. Return the data that the component needs
  return {
    channelList,
  };
}

export { useChannel };
