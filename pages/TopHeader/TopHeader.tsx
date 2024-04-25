'use client';
import { Container, Text } from '@mantine/core';
import classes from './TopHeader.module.css';
import { IconBrandFacebook, IconLocation, IconMail, IconPhoneCall, IconRecordMail } from '@tabler/icons-react';

export  default function TopHeader() {
  return (
    <div className={classes.topheader}>
      <Container size={'xl'} className={classes.container}>
        {/* Left side: Phone and Email */}
        <div className={classes.leftSide}>
          <Text className={classes.contactInfo}><IconPhoneCall size={16}/> Call Us:+91-0000000000</Text>
          <Text className={classes.contactInfo}><IconMail size={16} />    Email: info@gmail.com</Text>
          <Text className={classes.contactInfo}><IconLocation size={16}/> Address: lorem ipsum</Text>
        </div>

        {/* Right side: Social Icons */}
        {/* <div className={classes.rightSide}>
        
          <a href="#" className={classes.socialIcon}>
             <IconBrandFacebook size={16} color='white' />
          </a>
          <a href="#" className={classes.socialIcon}>
          <IconBrandFacebook size={16} />
          </a>
        </div> */}
      </Container>
    </div>
  );
}
