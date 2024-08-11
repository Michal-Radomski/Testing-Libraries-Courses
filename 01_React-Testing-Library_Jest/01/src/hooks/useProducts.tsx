import React from "react";
import { faker } from "@faker-js/faker/locale/en";
import useSWR from "swr";

const LIMIT = 6;

let cache = [] as Product[];
const productsFetcher = async (): Promise<Product[]> => {
  await pause(800);
  const nextPage = new Array(LIMIT).fill(0).map(() => {
    return {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      material: faker.commerce.productMaterial(),
      description: faker.commerce.productDescription(),
      color: faker.color.rgb({ prefix: "#", casing: "lower" }),
    };
  });
  cache = [...cache, ...nextPage];
  return cache;
};

const useProducts = (_p0?: { limit: number }) => {
  const [page, setPage] = React.useState<number>(0);

  const { isLoading, data } = useSWR(`/products/?page=${page}`, productsFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    keepPreviousData: true,
  });

  return {
    fetchNextPage: () => setPage((p: number) => p + 1),
    products: data || [],
    isLoading,
  };
};

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default useProducts;
