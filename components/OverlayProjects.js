import Link from 'next/link'
import { FlexContainerCol, FlexContainerRow} from './styles'
import ProjectCard from './ProjectCard';

export default function OverlayProjects(props) {
  const projects = [
    {
      name: '3d modeling',
      year: '2023',
      body: "learned blender and react-three-fiber to revamp this portfolio website to include 3d graphics (check out the keyboard!). check out the art section to see more blender creations :)",
      skillsUsed: "react three fiber | blender",
      image: "doll.gif",
    },
    {
      name: 'fraternity website',
      year: '2022',
      body: "created a new website for a fraternity in preparation for their rush week. get to know the brothers with the revamped interactive design, and find out more about their rush events! website is now maintained by the fraternity webmasters.",
      skillsUsed: "nextjs | css",
      image: "txi.gif",
      link: "https://txi.mit.edu/",
    },
    {
      name: 'pixonary',
      year: '2021',
      body: "a collaborative drawing game without competitive pressure. find a group of friends of any artistic ability and make some pixel art together! co-created with lucy zhang '21.",
      skillsUsed: "reactjs | google oauth | express | socketio | materialui | mongodb | css",
      image: "pixonary.png",
      link: "https://pixonary-e5c57c727285.herokuapp.com/",
    },
    {
      name: 'mit borderline webmaster',
      year: '2021',
      body: "maintained the site while revamping the murals page to include on-hover mural animations to resemble the in person AR mural experience in the mit tunnels.",
      skillsUsed: "html | css",
      image: "borderline.gif",
      link: "http://borderline.mit.edu/murals.html",
    },
    {
      name: 'math modeling',
      year: '2020',
      body: "3rd place team in National Mathworks Math Modeling Challenge. modeled the transition from diesel to electric trucking with the Lotka-Volterra approach. wrote a final paper that was presented on in a video.",
      skillsUsed: "excel | matlab | LaTeX",
      image: "mmodeling.png",
      link: "https://m3challenge.siam.org/sites/default/files/uploads/M3%20THIRD%20PLACE_13202.pdf",
    },
    {
      name: 'PROMYS math research',
      year: '2019',
      body: "worked in group of 4 to create conjectures about the fibonacci numbers with respect to modular arithmetic, and built proofs without reference to external resources.",
      skillsUsed: "LaTeX | number theory",
      image: "promysnt.png",
      relativeLink: "fib_numbers.pdf",
    },
    {
      name: 'chinese culture connection',
      year: '2020',
      body: "worked in group of 5 to create a website for a nonprofit organization. mainly worked on frontend development.",
      skillsUsed: "html | css",
      image: "ccccfg.png"
    },
    {
      name: 'traffic mitigation proposal',
      year: '2018',
      body: "6th place team in national TEAMS competition. researched innovative technologies (roundabouts, adaptive traffic lights, parking sensors, hydronics) to present a proposal on mitigating traffic congestion. final solution of using roundabouts was inspired by braess's paradox.",
      skillsUsed: "",
      image: "teamstsa.png",
      relativeLink: "traffic_poster.pdf",
    }
  ]

  const projectCards = projects.map((project) => {
    return <ProjectCard {...project}/>
  })
  return (
    <>
      <FlexContainerCol>
        <div><h1>projects</h1></div>
        <FlexContainerRow>
          {projectCards}
        </FlexContainerRow>
      </FlexContainerCol>
    </>
  )
}