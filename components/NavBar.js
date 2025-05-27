import Link from 'next/link'
import { Navbar } from './styles'

export default function NavBar() {
  return (
    <Navbar>
        <Link href="/">home</Link>
        <Link href="/about">about</Link>
        <Link href="/school">school</Link>
        <Link href="/projects">projects</Link>
        <Link href="/photoshots">photoshots</Link>
        <Link href="/graphic-designs">graphic designs</Link>
        <Link href="/resume">resume</Link>
    </Navbar>
  )
}