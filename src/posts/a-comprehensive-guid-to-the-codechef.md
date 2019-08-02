---
title: "A comprehensive guide to the Codechef"
published: "Nov 6, 2016"
updated: ""
tags: "code, competitive, programming, cpp"
---

![Pair Programming](https://res.cloudinary.com/prvnbist/image/upload/v1559636489/portfolio/Blog/alvaro-reyes-500044-unsplash.jpg "Pair Programming")
<span class="image__title">Photo by <a href="https://unsplash.com/@alvaroreyes?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Alvaro Reyes</a> on <a href="/search/photos/code?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

[CodeChef](https://www.codechef.com/) is a non-profit educational initiative of [Directi](http://www.directi.com/). It is a global [competitive programming](https://en.wikipedia.org/wiki/Competitive_programming) platform which supports over 50 programming languages and has a large community of programmers that helps students and professionals test and improve their coding skills. Its objective is to provide a platform for practice, competition and improvement for both students and professional software developers. Apart from this, it aims to reach out to students while they are young and inculcate a culture of programming in India.

## Why competitive programming is necessary

The aim of competitive programming is to write source code of computer programs which are able to solve given problems. A vast majority of problems appearing in programming contests are mathematical or logical in nature. Typical such tasks belong to one of the following categories: [combinatorics](https://en.wikipedia.org/wiki/Combinatorics), [number theory](https://en.wikipedia.org/wiki/Number_theory), [graph theory](https://en.wikipedia.org/wiki/Graph_theory), [geometry](https://en.wikipedia.org/wiki/Geometry), [string analysis](https://en.wikipedia.org/wiki/String_%28computer_science%29) and [data structures](https://en.wikipedia.org/wiki/Data_structure). Problems related to [artificial intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence) are also popular in certain competitions.

## How CodeChef works and it’s functionality

CodeChef is divided into two sections — [Practice](https://www.codechef.com/problems/school) and [Compete](https://www.codechef.com/contests). _Practice Section_ holds vast majority of problems sorted accordingly to their level of complexity. Beginners must start solving problems from the beginner’s section (pun intended) and then progress towards the next sections. Questions are further divided into folowing categories — Code for sorting alphabetically, Successful Submissions for sorting questions based on most submissions and last being the Accuracy for level of accurate solution.

Question are basically wrapped around situations just to enhance a little complexity, but they are generally self explanatory. Every question requires the programmer to read and understand the problem completely before solving it. Next up will be an Input given by the question itself and then the question will ask for a desired output. After that there will always be few example showing the example input and the possible outcome.

Then after understanding the question you have to click on the submit button at the end of the question to write a code that is capable of solving the question effeciently. After clicking Submit, you will be displayed a page with code editor where you write your code or upload a file of your code. Now before submitting you must change the languages option to your preferred language given alongside the font-size option at the top for preferred language or above the submit button in the bottom for desired compiler of chosen language. Then click on the Submit button at the bottom then you will be directed to the next page prompting if your submission is accepted or not and if not it will show the possible errors.

Here are the following possible errors -

-   Accepted
-   Time Limit Exceeded
-   Wrong Answer
-   Runtime Error
-   Compilation Error

Accepted — Your program ran `successfully` and gave a correct answer. If there is a score for the problem, this will be displayed in parenthesis next to the checkmark.

Time Limit Exceeded — Your `program` was compiled successfully, but it didn’t stop before time limit. Try optimizing your approach.

Wrong answer — Your program compiled and ran succesfully but the output did not match the expected output.

Runtime Error — Your code compiled and ran but `encountered` an error. The most common reasons are using too much memory or dividing by zero. For the specific error codes see the help section.

Compilation Error — Your code was unable to compile. When you see this icon, click on it for more information.

## Now lets try solving a question.

For an example we’ll be solving a question in beginner section with second most successful submissions i.e the [ATM problem — Code : HS08TEST](https://www.codechef.com/problems/HS08TEST)

### Problem 
Pooja would like to withdraw X $US from an ATM. The cash machine will only accept the transaction if X is a multiple of 5, and Pooja’s account balance has enough cash to perform the withdrawal transaction (including bank charges). For each successful withdrawal the bank charges 0.50 $US. Calculate Pooja’s account balance after an attempted transaction.

### Input  
Positive integer 0 < X < =2000 — the amount of cash which Pooja wishes to withdraw.   
Non-negative number 0 <= Y <= 2000 with two digits of precision — Pooja’s initial account balance.

### Output  
Output the account balance after the attempted transaction, given as a number with two digits of precision. If there is not enough money in the account to complete the transaction, output the current bank balance.

### Example — Successful Transaction
_Input :_ 30 120.00   
_Output :_ 89.50

### Example — Incorrect Withdrawal Amount (not multiple of 5)
_Input :_ 42 120.00   
_Output :_ 120.00

### Example — Insufficient Funds   
_Input :_ 300 120.00   
_Output :_ 120.00

### Explanation of the Question
In the question we’re taking example of a women named Pooja who wants to withdraw X amount of money from the ATM. Now for transaction the withdrawing amount must be a multiple of 5 and for every transaction the bank is charging 0.50 that means the remaining balance would — Remaining Balance = Initial Amount — (Withdrawn Amount + 0.50 Bank Charges).

### How to input values from the question?
Well you don’t!! You just have to assume that the user at the other end is entering the inputs you just have to read the values and Similarly, while displaying the results, you need to display it in the exact format as is specified in the problem statement.   
I have given below the solution of the [ATM problem — Code : HS08TEST](https://www.codechef.com/problems/HS08TEST)

```cpp
#include<stdio.h>
int main() {
    int amt;
    float bal;
    scanf("%d",&amt);
    scanf("%f",&bal);
    if(amt%5==0 && ((float)amt+0.5)<bal)
        printf("%.2f",bal-0.50-(float)amt);
    else
        printf("%.2f",bal);
    return 0;
}
```

This problem is solved in [C language](https://en.wikipedia.org/wiki/C_%28programming_language%29). If you analyse the code you’ll see that there is no printf function in the beginning, that’s what I explained before. Then I used scanf function to read the input provided by the question. Thereafter, follows the logic for the solution and at the end is the printf function that outputs the result in a format written in the questions example output.

### Minor drawback of CodeChef’s Code Editing Process  
After the submission of the your code, there will be 5 possible outcome as told before. Code is considered legit if and only if the answer is Accepted i.e with the green tick and if other errors are displayed you’ve to write the code again and then submit it. The wrong output would be considered as an attempt and will be listed in the Submissions section. _Isn’t it a bad feature??_, NO, absolutely not, it teaches you the very basic concept of [competitive programming](https://en.wikipedia.org/wiki/Competitive_programming) i.e you only get one chance, you’re either correct or wrong, there’s no midway. That is why competitive programming is encouraged to do.

### But I’m not a pro coder, I’m still learning!! 
Well, that’s how I started, a friend of mine who’s already deep into competitive programming adviced me to use Online IDE(Integrated Development Environment) like [Ideone](http://ideone.com/) or IDE S/W like Codeblocks to test my code before submitting in CodeChef.

## Compete in online coding contests

There are two types of competition formats: _short-term_ and _long-term_. Each round of short-term competition lasts from 1 to 3 hours. Long-term competitions can last from a few days to a few months.

### Short Term Contests  
• [ACM-ICPC](https://en.wikipedia.org/wiki/ACM_International_Collegiate_Programming_Contest) — One of the oldest competitions, for students of universities in groups of 3 persons each, sponsored by IBM.   
• [ACSL](https://en.wikipedia.org/wiki/American_Computer_Science_League) — Computer Science competition with written and programming portions, for middle/high school students.  
• [CodeChef Cook-Off](https://www.codechef.com/COOK76) — An ACM-ICPC style programming contest held on second last Sunday of every month.   
• [CodeChef Lunchtime](https://www.codechef.com/LTIME42) — A Junior Programming series held on last Sunday of every month, for middle/high school students.   
• [Facebook Hacker Cup](https://en.wikipedia.org/wiki/Facebook_Hacker_Cup) — Competition held from 2011, provided and sponsored by Facebook.   
• [Google Code Jam](https://en.wikipedia.org/wiki/Google_Code_Jam) — Competition held from 2003, provided and sponsored by Google.   
• [ICFP Programming Contest](https://en.wikipedia.org/wiki/ICFP_Programming_Contest) — Competition held since 1998 by the [International Conference on Functional Programming](https://en.wikipedia.org/wiki/International_Conference_on_Functional_Programming).   
• [IEEExtreme Programming Contest](https://en.wikipedia.org/wiki/IEEEXtreme_Programming_Competition) — Competition held since 2006 by IEEE.   
• [IOI](https://en.wikipedia.org/wiki/International_Olympiad_in_Informatics) — One of the oldest competitions, for secondary school students.   
• [Top Coder](https://en.wikipedia.org/wiki/TopCoder) — Algorithm — competition held since 2004 by TopCoder;.

In most of the above competitions, since the number of contestants is quite large, competitions are usually organized in several rounds. They usually require online participation in all rounds except the last, which require onsite participation. A special exception to this is IEEEXtreme, which is a yearly 24-hour virtual programming competition. The top performers at IOI and ACM-ICPC receive gold, silver and bronze medals while in the other contests, cash prizes are awarded to the top finishers. Also hitting the top places in the score tables of such competitions may attract interest of recruiters from software and Internet companies.

## Some others Competitve Programming websites

The programming community around the world has created and maintained several internet-resources dedicated to competitive programming. They offer standalone contests with or without minor prizes. Also the past archives of problems are a popular resource for training in competitive programming. These include:   
• [Hacker Rank](https://www.hackerrank.com/)   
• [Code Forces](http://codeforces.com/)   
• [Top Coder](https://www.topcoder.com/)   
• [Hacker Earth](https://www.hackerearth.com/)   
• [SPOJ](http://www.spoj.com/)

Thanks for reading!!