// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
// Custom components
import Card from 'components/card/Card';
import { apiUrl, axiosConfig } from 'components/requests';
import { useEffect, useState } from 'react';
// Assets 
import Swal from 'sweetalert2';
import Dropzone from 'views/admin/profile/components/Dropzone';

export default function Upload(props: { used?: number; total?: number;[x: string]: any }) {

	
	const { used, total, ...rest } = props; 
	const proceedUpload = () => {
	const formData = new FormData();
		Swal.fire({title: 'Submit filename',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  showCancelButton: true,
  confirmButtonText: 'Start upload',
  showLoaderOnConfirm: true,
			preConfirm: ( async (name) => { 
				
				formData.append('mailFile', fileName); 
				try {
					
				formData.append('name', name)
					const postFile = await axios.post(apiUrl + "/clients/import", formData, axiosConfig)
					window.location.reload()
				} catch (error:any) {
					Swal.fire({ title: "Error!", text:error.message})
				}
			 })
   			
		}
  
		)
	}
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const textColorSecondary = 'gray.400';
	const [fileName, setfileName] = useState(null)
	 
	useEffect(() => {
	 console.log(fileName)
	}, [fileName])
	
	return (
		<Card {...rest} mb='20px' alignItems='center' p='20px'>
			<Flex h='100%' direction={{ base: 'column', '2xl': 'row' }}>
				<Dropzone
					filname={setfileName}
					w={{ base: '100%', '2xl': '268px' }}
					me='36px'
					maxH={{ base: '60%', lg: '50%', '2xl': '100%' }}
					minH={{ base: '60%', lg: '50%', '2xl': '100%' }} 
				/>
				<Flex direction='column' pe='44px'>
					<Text
						color={textColorPrimary}
						fontWeight='bold'
						textAlign='start'
						fontSize='2xl'
						mt={{ base: '20px', '2xl': '50px' }}>
						Upload your mailist here!
					</Text>
					<Text
						color={textColorSecondary}
						fontSize='md'
						my={{ base: 'auto', '2xl': '10px' }}
						mx='auto'
						textAlign='start'>
						Your mailist will be encrypted & stored in the databse and shown only for this user.
					</Text>
					<Flex w='100%'>
						<Button
							disabled={!fileName}
							onClick={() => {proceedUpload()}}
							me='100%'
							mb='50px'
							w='140px'
							minW='140px'
							mt={{ base: '20px', '2xl': 'auto' }}
							variant='brand'
							fontWeight='500'>
							Upload now
						</Button>
							<Text
						color={textColorPrimary}
						fontSize='md'
						my={{ base: 'auto', '2xl': '10px' }}
						mx='auto'
						textAlign='start'> 
					</Text>
					</Flex>
				</Flex>
				
			</Flex>
				
		</Card>
	);
}
