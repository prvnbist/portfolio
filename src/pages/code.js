import React from "react"

import Layout from "../components/Layout"
import Tabs from "../components/Tabs"
import Loading from "../components/Loading"

const Github = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [repos, setRepos] = React.useState([])
  React.useEffect(() => {
    const URL = `https://api.github.com/users/prvnbist/repos`
    const fetchRepos = async url => {
      const res = await fetch(url)
      if (res.status === 200) {
        const parse = await res.json()
        setRepos(parse)
        setIsLoading(false)
      }
    }
    fetchRepos(URL)
  }, [])
  return isLoading ? (
    <Loading width={100} height={"450px"} />
  ) : (
    <div id="repos-list">
      {repos.map(repo => (
        <div className="repo-card" key={repo.id}>
          <span className="repo-name">
            <a href={repo.html_url}>{repo.name}</a>
          </span>
          <p className="repo-description">{repo.description}</p>
          <div className="repo-card-footer">
            <span className="repo-language">
              <span
                style={{
                  background:
                    repo.language === "JavaScript"
                      ? "#F1E05A"
                      : repo.language === "CSS"
                      ? "#563D7C"
                      : "#E34C26",
                }}
              />
              <span>{repo.language}</span>
            </span>
            <div>
              <span className="repo-likes">
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 0L11.1265 5.26604L17 6.11567L12.75 10.2124L13.753 16L8.5 13.266L3.247 16L4.25 10.2124L0 6.11567L5.8735 5.26604L8.5 0Z"
                    fill="#2158E8"
                  />
                </svg>
                {repo.stargazers_count}
              </span>
              <span className="repo-forks">
                <svg
                  width="11"
                  height="14"
                  viewBox="0 0 11 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.1875 8.4C3.8775 8.4 3.12125 9.345 2.87375 9.968C3.60938 10.29 4.125 11.032 4.125 11.9C4.125 12.457 3.9077 12.9911 3.52091 13.3849C3.13411 13.7788 2.60951 14 2.0625 14C1.51549 14 0.990886 13.7788 0.604092 13.3849C0.217299 12.9911 0 12.457 0 11.9C0 10.983 0.570625 10.206 1.375 9.919V4.081C0.570625 3.794 0 3.017 0 2.1C0 1.54305 0.217299 1.0089 0.604092 0.615076C0.990886 0.221249 1.51549 0 2.0625 0C2.60951 0 3.13411 0.221249 3.52091 0.615076C3.9077 1.0089 4.125 1.54305 4.125 2.1C4.125 3.017 3.55437 3.794 2.75 4.081V7.784C3.355 7.329 4.235 7 5.5 7C7.33563 7 7.9475 6.062 8.14688 5.439C7.40438 5.124 6.875 4.375 6.875 3.5C6.875 2.94305 7.0923 2.4089 7.47909 2.01508C7.86589 1.62125 8.39049 1.4 8.9375 1.4C9.48451 1.4 10.0091 1.62125 10.3959 2.01508C10.7827 2.4089 11 2.94305 11 3.5C11 4.438 10.395 5.25 9.56312 5.502C9.38437 6.503 8.7175 8.4 6.1875 8.4ZM2.0625 11.2C1.88016 11.2 1.7053 11.2737 1.57636 11.405C1.44743 11.5363 1.375 11.7143 1.375 11.9C1.375 12.0857 1.44743 12.2637 1.57636 12.395C1.7053 12.5263 1.88016 12.6 2.0625 12.6C2.24484 12.6 2.4197 12.5263 2.54864 12.395C2.67757 12.2637 2.75 12.0857 2.75 11.9C2.75 11.7143 2.67757 11.5363 2.54864 11.405C2.4197 11.2737 2.24484 11.2 2.0625 11.2ZM2.0625 1.4C1.88016 1.4 1.7053 1.47375 1.57636 1.60503C1.44743 1.7363 1.375 1.91435 1.375 2.1C1.375 2.28565 1.44743 2.4637 1.57636 2.59497C1.7053 2.72625 1.88016 2.8 2.0625 2.8C2.24484 2.8 2.4197 2.72625 2.54864 2.59497C2.67757 2.4637 2.75 2.28565 2.75 2.1C2.75 1.91435 2.67757 1.7363 2.54864 1.60503C2.4197 1.47375 2.24484 1.4 2.0625 1.4ZM8.9375 2.8C8.75516 2.8 8.58029 2.87375 8.45136 3.00503C8.32243 3.1363 8.25 3.31435 8.25 3.5C8.25 3.68565 8.32243 3.8637 8.45136 3.99497C8.58029 4.12625 8.75516 4.2 8.9375 4.2C9.11984 4.2 9.29471 4.12625 9.42364 3.99497C9.55257 3.8637 9.625 3.68565 9.625 3.5C9.625 3.31435 9.55257 3.1363 9.42364 3.00503C9.29471 2.87375 9.11984 2.8 8.9375 2.8Z"
                    fill="#373D49"
                  />
                </svg>
                {repo.forks}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const Projects = () => {
  const projects = [
    {
      image:
        "https://res.cloudinary.com/prvnbist/image/upload/v1563035171/portfolio/Code%20-%20Projects/property-app.png",
      name: "Property App",
      description:
        "Went on a 3 day sprint to build it. It's a property listing app, where you can create you're own property ad.",
      tags: [
        "MongoDB",
        "ExpressJs",
        "ReactJs",
        "JWT",
        "Formik & Yup",
        "Heroku",
      ],
      demo: "https://property-app-demo.herokuapp.com/",
      code: "https://github.com/prvnbist/property-app",
    },
    {
      image:
        "https://res.cloudinary.com/prvnbist/image/upload/v1561653240/portfolio/Code%20-%20Projects/expenseapp.jpg",
      name: "Expense App",
      description:
        "A full stack app to let the user keep record of their expenses and analyse their spending behaviour.",
      tags: [
        "MongoDB",
        "ExpressJs",
        "ReactJs",
        "GraphQL",
        "JWT",
        "Formik & Yup",
        "Heroku",
        "Netlify",
      ],
      demo: "https://expense-app.netlify.com/",
      code: "https://github.com/prvnbist/expense-app-frontend",
    },
    {
      image:
        "https://res.cloudinary.com/prvnbist/image/upload/v1561658278/portfolio/Code%20-%20Projects/recipeapp.png",
      name: "Recipe App",
      description: "An app to manage all of your recipes in one place.",
      tags: ["ReactJs", "Redux", "SCSS"],
      demo: "https://z7ngi.codesandbox.io/",
      code: "https://codesandbox.io/s/recipe-app-reactredux-z7ngi",
    },
    {
      image:
        "https://res.cloudinary.com/prvnbist/image/upload/v1561657883/portfolio/Code%20-%20Projects/todoapp.png",
      name: "Todo App",
      description: "An app to list all of your todos.",
      tags: ["ReactJs", "Redux", "SCSS"],
      demo: "https://pqlwh.codesandbox.io/",
      code: "https://codesandbox.io/s/todo-redux-pqlwh",
    },
    {
      image:
        "https://res.cloudinary.com/prvnbist/image/upload/v1561653240/portfolio/Code%20-%20Projects/patterncss.jpg",
      name: "PatternCSS",
      description:
        "A Pattern Library consisting of UI Components to build a consistent website.",
      tags: ["SCSS", "Pug", "Webpack"],
      demo: "https://patterncss.netlify.com/",
      code: "https://github.com/prvnbist/PatternCSS",
    },
  ]
  return (
    <div id="projects">
      {projects.map((project, index) => (
        <div className="project__card" key={index}>
          <div
            className="project__card__left"
            style={{
              backgroundImage: `url(${project.image})`,
            }}
          />
          <div className="project__card__right">
            <div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <ul>
                {project.tags.map((tag, i) => (
                  <li className="tag" key={i}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <a href={project.demo} className="btn btn-primary">
                Demo
              </a>
              <a href={project.code} className="btn btn-outline-light">
                Code
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default () => {
  const meta = {
    title: "Code | Praveen Bisht",
    description: "View all of my code demos and projects in one place.",
    keywords: `code, app, website,codepen, github, projects, demos, interaction, animation, html, css, javascript, react, jquery, express, mongodb, graphql`,
    imgUrl: {
      google: "",
      facebook: "",
      twitter: "",
    },
  }
  const tabs = ["Projects", "Github"]
  const tabsContent = [
    {
      component: <Projects />,
    },
    {
      component: <Github />,
    },
  ]
  return (
    <Layout meta={meta}>
      <div className="container">
        <h4 className="page-heading">Explore Code</h4>
        <Tabs tabs={tabs} content={tabsContent} />
      </div>
    </Layout>
  )
}
