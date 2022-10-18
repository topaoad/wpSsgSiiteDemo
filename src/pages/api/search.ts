import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import client from "src/lib/apollo/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const filters = JSON.parse(req.body);

    // let hasParkingFilter = ``;
    // let petFriendlyFilter = ``;
    // let minPriceFilter = ``;
    // let maxPriceFilter = ``;

    // if (filters.hasParking) {
    //   hasParkingFilter = `
    //   {
    //     key: "has_parking"
    //     compare: EQUAL_TO
    //     value: "1"
    //   },
    //   `;
    // }

    // if (filters.petFriendly) {
    //   hasParkingFilter = `
    //   {
    //     key: "pet_friendly"
    //     compare: EQUAL_TO
    //     value: "1"
    //   },
    //   `;
    // }

    // if (filters.minPrice) {
    //   minPriceFilter = `
    //   {
    //     key: "price"
    //     compare: GREATER_THAN_OR_EQUAL_TO
    //     value: "${filters.minPrice}"
    //     type: NUMERIC
    //   }
    //   `;
    // }
    // if (filters.maxPrice) {
    //   maxPriceFilter = `
    //   {
    //     key: "price"
    //     compare: LESS_THAN_OR_EQUAL_TO
    //     value: "${filters.maxPrice}"
    //     type: NUMERIC
    //   }
    //   `;
    // }

    const { data } = await client.query({
      query: gql`
        query GalleryInGalleries {
          galleries {
            nodes {
              uri
              slug
              title
              featuredImage {
                node {
                  sourceUrl
                }
              }
              galleryProperty {
                bathrooms
                bedrooms
                gardens
                parkings
                price
              }
              ... on Gallery {
                id
                blocksJSON
                title
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
              }
              galleryId
            }
          }
        }
      `,
    });
    // console.log("SERVER SIDE: ",  data.galleries.nodes);
    return res.status(200).json({
      // total: data.properties.pageInfo.offsetPagination.total,
      galleries: data.galleries.nodes,
    });
  } catch (e) {
    console.log("ERROR: ", e);
  }
};

export default handler;


