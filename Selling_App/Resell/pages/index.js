import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';

import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';

export const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Image src={imageUrl} width={500} height={300} />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='3xl' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{desc1}<br />{desc2}</Text>
      <Button fontSize='xl' bg="blue.300" color="white">
        <Link href={linkName}><a>{buttonText}</a></Link>
      </Button>
    </Box>
  </Flex>
);


const Home = ({ itemsForSale, itemsForRent }) => (
  <Box>
    <Banner
      purpose='SELL AN ITEM'
      title1='SELL ITEM FOR'
      title2='Everyone'
      desc1=' Explore from all second hand items'
      desc2='and more'
      buttonText='Explore Renting'
      linkName='/search?purpose=for-rent'
      imageUrl=''
    />
    <Flex flexWrap='wrap'>
      {itemsForRent.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
    <Banner
      purpose='BUY ITEMS'
      title1=' Find, Buy & Own Your'
      title2='SECOND HAND'
      desc1=' Explore'
      desc2=' and more'
      buttonText=' Massive Discount'
      linkName='/search?purpose=for-sale'
      imageUrl=''
    />
    <Flex flexWrap='wrap'>
      {itemsForSale.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
  </Box>
);

export async function getStaticProps() {
  const itemsForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const itemsForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      itemsForSale: itemsForSale?.hits,
      itemsForRent: itemsForRent?.hits,
    },
  };
}

export default Home;
