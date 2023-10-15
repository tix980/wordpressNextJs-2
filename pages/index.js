import client from "client";
import { gql } from "@apollo/client";
import {BlockRenderer} from "/components/BlockRender";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
export default function Home(props) {
  console.log(props);
  return <div><BlockRenderer blocks={props.blocks}/></div>;
}


export const getStaticProps = async () =>{
  const {data} = await client.query({
    query: gql`
    query NewQuery {
      nodeByUri(uri: "/") {
        ... on Page {
          id
          blocks
        }
      }
    }
    `
  })
  return {
    props:{
      blocks:  cleanAndTransformBlocks(data.nodeByUri.blocks),
    },
  };
};