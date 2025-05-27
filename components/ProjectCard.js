import React, { useState, useEffect } from 'react';
import { GlassCard, CardBody, CardImage, CardContainer, View } from './styles';
import Image from 'next/image';

export default function ProjectCard(props) {
    const { name, year, body, skillsUsed, image, link, relativeLink } = props;
    return (
        <>
        <CardContainer>
            <CardImage>
                <div>
                <Image src={`/projects/${image}`} width={300} height={300}/>
                </div>
            </CardImage>
            <GlassCard>
                <CardBody>
                    <h1> { name + ' | ' + year} </h1>
                    <p> { skillsUsed} </p>
                    <p> { body } </p>
                </CardBody>
                {relativeLink ? <View href={`/projects/${relativeLink}`}>view me</View> : <></>}
                {link ? <View href={link}>view me</View> : <></>}
        </GlassCard>
        </CardContainer>
        </>
    )
}