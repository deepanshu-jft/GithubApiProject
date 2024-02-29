import React from "react"
import ReactDiffViewer from "react-diff-viewer"

function CommitDifference() {
  const newCode = `
  # Frontend Mentor - Blog preview card solution

This is a solution to the [Blog preview card challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/blog-preview-card-ckPaj01IcS). 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Frontend Mentor Solution](https://www.frontendmentor.io/solutions/blog-preview-card-LfbHarZu9B)
- Live Site URL: [Live Site](https://deepanshu-kaushik.github.io/blog-preview-card/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework

### What I learned

In this project, I honed my skills in web development by focusing on the fundamentals of HTML and CSS, with a particular emphasis on mastering Flexbox. Through the implementation of Flexbox, I gained a deeper understanding of creating responsive and visually appealing designs.

I incorporated Tailwind CSS into this project, and it played a significant role in enhancing my familiarity with the framework, as well as reinforcing my grasp of fundamental concepts in vanilla CSS.

### Useful resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation) - The documentation greatly assisted me in understanding the framework. I referred to it whenever I encountered difficulties.

## Author

- Linkedin - [Deepanshu Kaushik](https://www.linkedin.com/in/hello-deepanshu/)
- Frontend Mentor - [@Deepanshu-Kaushik](https://www.frontendmentor.io/profile/Deepanshu-Kaushik)
- LeetCode - [@DeepanshuKaushik](https://leetcode.com/DeepanshuKaushik/)
`
  const oldCode = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 

  <link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">
  <link rel="stylesheet" href="./dist/style.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@600;800&display=swap');
    *{
      font-family: 'Figtree', sans-serif;
    }
    :root {
      --Yellow: hsl(47, 88%, 63%);
      --White: hsl(0, 0%, 100%);
      --Grey: hsl(0, 0%, 50%);
      --Black: hsl(0, 0%, 7%);
    }

    .card {
      border: 1px solid black;
      box-shadow: 5px 5px black;
      transition: .5s;
    }
    
    .card:hover {
      box-shadow: 10px 10px black;
    }
  </style>
  <title>Frontend Mentor | Blog preview card</title>
</head>
<body class="bg-[--Yellow]">

  <main class="w-full h-screen flex justify-center items-center">
    <div class="card bg-[--White] p-5 w-80 rounded-2xl">
      <img class="rounded-lg w-full" src="./assets/images/illustration-article.svg" alt="card image">
      
      <div class="container pr-8 flex flex-col items-start">
        
        <div class="rounded-md text-sm bg-[--Yellow] px-3 py-1 font-bold my-6">Learning</div>
        
        <div class="text-xs mt-[-10px] mb-4">Published 21 Dec 2023</div>
        
        <h1 class="title text-xl font-[800] my-3 cursor-pointer hover:text-[--Yellow]">HTML & CSS foundations</h1>
        
        <p class="text-[--Grey] text-sm my-2">These languages are the backbone of every website, defining structure, content, and presentation.</p>
        
        <div class="sign mt-4 flex items-center gap-3">
          <img class="w-7" src="./assets/images/image-avatar.webp" alt=" profile">
          <div class="text-xs font-[800]">Greg Hooper</div>
        </div>
        
      </div>
    </div>
  </main>
</body>
</html>
`
  return (
    <ReactDiffViewer
      oldValue={oldCode}
      newValue={newCode}
      splitView={true}
      disableWordDiff={true}
    />
  )
}

export default CommitDifference
