// const sanityClient = require("./_sanityClient");
// const BlocksToMarkdown = require("@sanity/block-content-to-markdown");
// const portableText = require("@portabletext/to-html");

// // console.log(`[ toHTML ]:`, portableText.toHTML());

// // import { toHTML } from "@portabletext/to-html";

// function generatePost2(post, index) {
//   // console.log(`[ post ${index + 1} ]:`, post);

//   return {
//     ...post,
//     body: portableText.toHTML(post.body, {
//       components: {
//         types: {
//           image: ({ value }) => {
//             // console.log(`[ value ]:`, value);
//             return `<img src="${value.url}" />`;
//           },
//         },

//         marks: {
//           strong: ({ children }) => {
//             return `<strongY>${children}</strongY>`;
//           },
//           em: ({ children }) => {
//             console.log(`[ children ]:`, children);
//             return `<span class="text--em">${children}</span>`;
//           },
//         },
//       },
//     }),
//   };
// }

const getHouses = function () {
  //   const query = `
  // *[ _type == "post" && !(_id in path("drafts.**")) ]{
  //   "postSlug": customSlug.current,
  //   postTitle,
  //   postSummary,
  //   publishedAt,
  //   body[]{
  //     _type != "image" => @,
  //     _type == "image" => {
  //       asset,
  //       "_type": "image",
  //       "url" : asset-> url,
  //       "originalFilename": asset-> originalFilename,
  //     },
  //   }
  // } | order(publishedAt desc)
  //   `;
  //   // groq query to get all posts that are not drafts with images assets in body dereferenced

  //   const params = {};
  //   let res = await sanityClient.fetch(query, params);

  //   let posts2 = res.map(generatePost2); // loop over the posts and generate the markdown
  //   // let posts = res.map(generatePost); // loop over the posts and generate the markdown

  //   //  console.log(`[ posts ]:`, posts );
  //   //  console.log(`[ res ]:`, res[2] );

  return [
    {
      lat: 52.04598746309256,
      lng: -0.9182846965196778,
      title: "Wicken Wood Cottage, Leckhampstead Road, Wicken",
      description: "",
      price: "£1,050,000",
      url: "https://www.rightmove.co.uk/properties/128712860#/",
      imageURL:
        "https://media.rightmove.co.uk/118k/117145/128712860/117145_1395_HWEB_IMG_00_0000.jpeg",
    },
  ];
};

module.exports = getHouses;
