import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import client from "src/lib/apollo/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // parseの際に空文字があるとシンタックスエラーを返すらしいので、 "null"を付与
    const filters = JSON.parse(req.body || null);

    let hasParkingFilter = "";
    let hasGardensFilter = "";
    let minPriceFilter = "";
    let maxPriceFilter = "";

    if (filters.hasParking) {
      hasParkingFilter = `
      {
        key: "parkings"
        compare: EQUAL_TO
        value: "1"
      },
      `;
    }

    if (filters.hasGardens) {
      hasGardensFilter = `
      {
        key: "gardens"
        compare: EQUAL_TO
        value: "1"
      },
      `;
    }

    if (filters.minPrice) {
      minPriceFilter = `
      {
        key: "price"
        compare: GREATER_THAN_OR_EQUAL_TO
        value: "${filters.minPrice}"
        type: NUMERIC
      }
      `;
    }
    if (filters.maxPrice) {
      maxPriceFilter = `
      {
        key: "price"
        compare: LESS_THAN_OR_EQUAL_TO
        value: "${filters.maxPrice}"
        type: NUMERIC
      }
      `;
    }

    const { data } = await client.query({
      query: gql`
        query GalleryInGalleries {
          galleries(where: { offsetPagination: { offset: ${
            ((filters.page || 1) - 1) * 3
          }, size:  3} 
          metaQuery: {
            relation: AND
            metaArray: [
              ${hasGardensFilter}
              ${hasParkingFilter}
              ${minPriceFilter}
              ${maxPriceFilter}
            ]
          }
            }) {
            nodes {
              databaseId
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
            }
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
        }
      `,
    });
    console.log(
      "SERVER SIDE: ",
      data.galleries.pageInfo.offsetPagination.total
    );
    return res.status(200).json({
      total: data.galleries.pageInfo.offsetPagination.total,
      galleries: data.galleries.nodes,
    });
  } catch (e) {
    console.log("ERROR: ", e);
  }
};

export default handler;

