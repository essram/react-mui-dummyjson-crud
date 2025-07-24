import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card, Container } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

export default function Home() {
  const queryProduct = useQuery({
    queryKey : ['products'],
    queryFn: async () => {
      const res = await fetch('https://fakestoreapi.com/products');
      return res.json()
    }
  })

  // console.log(queryProduct.data);
  
  return (
    <Container>
      {/* {
        queryProduct.data.map((product:Product)=>{
          return(
            <Card key={product.id}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </Card>
          )
        })
      } */}

      home
    </Container>
  );
}
