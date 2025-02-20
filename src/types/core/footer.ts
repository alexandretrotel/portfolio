export type BitcoinAddress = `bc1${string}`;
export type EthereumAddress = `0x${string}`;

export type DonationType = "bitcoin" | "ethereum";

export type Donation = {
  title: string;
  address: BitcoinAddress | EthereumAddress;
  type: DonationType;
};

export type Donations = Donation[];
