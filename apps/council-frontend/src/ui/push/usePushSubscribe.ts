import { useCallback, useEffect, useState } from "react";
import { useAccount, useSignTypedData } from "wagmi";
import * as PushAPI from "@pushprotocol/restapi";
import { SubscribeOptionsType } from "@pushprotocol/restapi/src/lib/channels";
import { chains } from "src/provider";
import PushSettings from "./settings.json";
import { UsePushSubscribeType, SignerType } from "./types";

export function usePushSubscribe(): UsePushSubscribeType {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const fetchChainId = () => {
    const [{ id: chainId }] = chains;
    const isProd = String(chainId) === "1";
    const env = isProd ? "prod" : "staging";
    const channel = isProd
      ? PushSettings.PROD_CHANNEL_ADDRESS
      : PushSettings.STAGING_CHANNEL_ADDRESS;
    return { chainId, env, channel };
  };

  const isUserSubscribed = useCallback(async () => {
    const { env, channel } = fetchChainId();
    const userSubscriptions = await PushAPI.user.getSubscriptions({
      user: String(address),
      env,
    });
    const addresses = userSubscriptions.map(
      ({ channel }: { channel: string }) => channel,
    );
    return addresses.includes(channel);
  }, [address]);

  // define a wrapper around the signTypedData function to match the types
  const { signTypedDataAsync: signer } = useSignTypedData();
  async function _signTypedData(
    domain: unknown,
    types: unknown,
    value: unknown,
  ) {
    let params: SignerType;
    // if they are all objects
    if (
      typeof domain === "object" &&
      typeof types === "object" &&
      typeof value === "object"
    ) {
      params = {
        domain: { ...domain },
        types: { ...types },
        value: { ...value },
      };
      const response = await signer(params);
      return response;
    } else {
      throw new Error("FAILURE");
    }
  }
  // define a wrapper around the signTypedData function to match the types
  const generatePayload = (): SubscribeOptionsType => {
    const { chainId, env, channel } = fetchChainId();
    const payload = {
      signer: { _signTypedData },
      channelAddress: `eip155:${chainId}:${channel}`, // channel address in CAIP
      userAddress: `eip155:${chainId}:${address}`, // user address in CAIP
      env,
    };
    return payload;
  };

  const toggleUserStatus = async () => {
    setLoading(true);
    try {
      const payload = generatePayload();
      const response = await (isSubscribed
        ? PushAPI.channels.unsubscribe(payload)
        : PushAPI.channels.subscribe(payload));

      if (response.status !== "error") {
        setIsSubscribed(!isSubscribed);
      }
      return response;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetch if the user is subscribed
    (async function () {
      setLoading(true);
      try {
        const isSubscribed = await isUserSubscribed();
        setIsSubscribed(isSubscribed);
      } finally {
        setLoading(false);
      }
    })();
  }, [isUserSubscribed]);

  return {
    toggleUserStatus,
    isSubscribed,
    loading,
  };
}
