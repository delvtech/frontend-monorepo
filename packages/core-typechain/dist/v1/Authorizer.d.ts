import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface AuthorizerInterface extends utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "canPerform(bytes32,address,address)": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "getRoleMember(bytes32,uint256)": FunctionFragment;
    "getRoleMemberCount(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "grantRoles(bytes32[],address)": FunctionFragment;
    "grantRolesToMany(bytes32[],address[])": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "revokeRoles(bytes32[],address)": FunctionFragment;
    "revokeRolesFromMany(bytes32[],address[])": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "canPerform",
    values: [BytesLike, string, string],
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMember",
    values: [BytesLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMemberCount",
    values: [BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, string],
  ): string;
  encodeFunctionData(
    functionFragment: "grantRoles",
    values: [BytesLike[], string],
  ): string;
  encodeFunctionData(
    functionFragment: "grantRolesToMany",
    values: [BytesLike[], string[]],
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, string],
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, string],
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, string],
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRoles",
    values: [BytesLike[], string],
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRolesFromMany",
    values: [BytesLike[], string[]],
  ): string;
  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "canPerform", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMember",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMemberCount",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "grantRoles", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "grantRolesToMany",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "revokeRoles",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeRolesFromMany",
    data: BytesLike,
  ): Result;
  events: {
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
}
export declare type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
>;
export declare type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;
export declare type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  {
    role: string;
    account: string;
    sender: string;
  }
>;
export declare type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;
export declare type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  {
    role: string;
    account: string;
    sender: string;
  }
>;
export declare type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;
export interface Authorizer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: AuthorizerInterface;
  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;
  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;
  functions: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;
    canPerform(
      actionId: BytesLike,
      account: string,
      arg2: string,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;
    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;
    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    grantRoles(
      roles: BytesLike[],
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    grantRolesToMany(
      roles: BytesLike[],
      accounts: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;
    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    revokeRoles(
      roles: BytesLike[],
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    revokeRolesFromMany(
      roles: BytesLike[],
      accounts: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
  canPerform(
    actionId: BytesLike,
    account: string,
    arg2: string,
    overrides?: CallOverrides,
  ): Promise<boolean>;
  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;
  getRoleMember(
    role: BytesLike,
    index: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;
  getRoleMemberCount(
    role: BytesLike,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  grantRoles(
    roles: BytesLike[],
    account: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  grantRolesToMany(
    roles: BytesLike[],
    accounts: string[],
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  hasRole(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides,
  ): Promise<boolean>;
  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  revokeRoles(
    roles: BytesLike[],
    account: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  revokeRolesFromMany(
    roles: BytesLike[],
    accounts: string[],
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    canPerform(
      actionId: BytesLike,
      account: string,
      arg2: string,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;
    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    grantRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides,
    ): Promise<void>;
    grantRoles(
      roles: BytesLike[],
      account: string,
      overrides?: CallOverrides,
    ): Promise<void>;
    grantRolesToMany(
      roles: BytesLike[],
      accounts: string[],
      overrides?: CallOverrides,
    ): Promise<void>;
    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides,
    ): Promise<void>;
    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides,
    ): Promise<void>;
    revokeRoles(
      roles: BytesLike[],
      account: string,
      overrides?: CallOverrides,
    ): Promise<void>;
    revokeRolesFromMany(
      roles: BytesLike[],
      accounts: string[],
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {
    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null,
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null,
    ): RoleAdminChangedEventFilter;
    "RoleGranted(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null,
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null,
    ): RoleGrantedEventFilter;
    "RoleRevoked(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null,
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null,
    ): RoleRevokedEventFilter;
  };
  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
    canPerform(
      actionId: BytesLike,
      account: string,
      arg2: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    grantRoles(
      roles: BytesLike[],
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    grantRolesToMany(
      roles: BytesLike[],
      accounts: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    revokeRoles(
      roles: BytesLike[],
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    revokeRolesFromMany(
      roles: BytesLike[],
      accounts: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    canPerform(
      actionId: BytesLike,
      account: string,
      arg2: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    grantRoles(
      roles: BytesLike[],
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    grantRolesToMany(
      roles: BytesLike[],
      accounts: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    revokeRoles(
      roles: BytesLike[],
      account: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    revokeRolesFromMany(
      roles: BytesLike[],
      accounts: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
