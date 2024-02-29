// // import GithubAuthController, { accesstoken } from "./AuthContoller.js";

// // // Now you can use the accesstoken variable here
// // GithubAuthController.getTest()
// // console.log(accesstoken);


// // // axios
// // //         .get(`http://localhost:4000/api/user/repos`, {
// // //           withCredentials: true, //for cookie
// // //         })
// // //         .then((res) => res.data)).then(data => {console.log(data)})


// // //         axios
// // //         .get(`http://localhost:4000/api/user/repos`, {
// // //           withCredentials: true, //for cookie
// // //         })
// // //         .then((res) => res.data)




// import axios from 'axios';

// // Function to fetch commit details
// async function fetchCommitDetails(owner, repo, commitSha) {
//   try {
//     const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits/${commitSha}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching commit details for ${owner}/${repo}/${commitSha}:`, error.message);
//     return null;
//   }
// }

// // Function to fetch file content for a specific commit
// async function fetchFileContent(owner, repo, filePath, commitSha) {
//   try {
//     const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
//       params: {
//         ref: commitSha
//       }
//     });
//     return response.data.content;
//   } catch (error) {
//     console.error(`Error fetching file content for ${owner}/${repo}/${filePath} at commit ${commitSha}:`, error.message);
//     return null;
//   }
// }

// // Main function to find old and new code for a commit
// async function findOldAndNewCode(owner, repo, commitSha) {
//   const commitDetails = await fetchCommitDetails(owner, repo, commitSha);

//   if (!commitDetails) {
//     console.error(`Unable to fetch commit details for ${owner}/${repo}/${commitSha}`);
//     return;
//   }

//   console.log(`Commit Message: ${commitDetails.commit.message}`);

//   // Iterate through each file in the commit
//   for (const file of commitDetails.files) {
//     console.log(`File: ${file.filename}`);
    
//     // Fetch the content of the file at the commit
//     const oldContent = await fetchFileContent(owner, repo, file.filename, commitSha + '^');
//     const newContent = await fetchFileContent(owner, repo, file.filename, commitSha);

//     console.log('Old Content:');
//     console.log(oldContent);

//     console.log('New Content:');
//     console.log(newContent);

//     console.log('-------------------');
//   }
// }

// // Replace 'your-username', 'your-repo', and 'commit-sha' with the appropriate values
// findOldAndNewCode('your-username', 'your-repo', 'commit-sha');


// // // https://github.com/Deepanshu-Kaushik/blog-preview-card/commit/7456c15a76fa0ef7929cc7296ab9d9535585ede0