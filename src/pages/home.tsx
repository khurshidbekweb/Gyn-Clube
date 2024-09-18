import men from '@/assets/men.png'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { featuredItems, programs } from '@/constants'
import { useUserState } from '@/store/user.store'
import { LogOut } from 'lucide-react'
import { FaArrowRightLong } from 'react-icons/fa6'
import {CgGym} from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '@/firebase'

const Home = () => {
	const {user, setUser} = useUserState()
	const navigate = useNavigate()

	const onLogOut = () => {
		auth.signOut().then(()=>{
			setUser(null)
			navigate('/')
		})
	}

	return (
		<>
			<div className='w-full h-screen flex items-center'>
				<div className='max-w-xl ml-60 flex h-full flex-col justify-center'>
					<h1 className='text-9xl font-semibold uppercase'>Workout with me</h1>
					<p className='text-muted-foreground'>
						A huge selection of health and fitness content, healthy recipes and
						transformation stories to help you get fit and stay fit!
					</p>
					{
						user ? <div className="flex gap-x-4">
							<Link to={'/gym'}>
								<Button className='w-fit mt-6 font-bold h-12 space-x-3' size={'lg'}>
									<CgGym size={20}/>
									<span>Go to Gym</span>
								</Button>
							</Link>
							<Button onClick={onLogOut} className='w-fit mt-6 space-x-2 font-bold h-12 bg-destructive hover:bg-red-600' size={'lg'}>
								<LogOut className='w-5'/>
								<span>Log Out</span>
							</Button>
						</div> :
						<Link to={'/auth'}>
							<Button className='w-fit mt-6 font-bold h-12' size={'lg'}>
								Join club now
							</Button>
						</Link>
					}


					<div className='mt-24'>
						<p className='text-muted-foreground'>AS FEATURED IN</p>
						<div className='flex items-center gap-4 mt-2'>
							{featuredItems.map((Icon, index) => (
								<Icon key={index} className='w-12 h-12' />
							))}
						</div>
					</div>
				</div>

				<img src={men} className='w-1/4' />
			</div>

			<div className='container max-w-5xl mx-auto'>
				<h1 className='text-4xl'>Not sure where to start?</h1>
				<p className='mt-2 text-muted-foreground'>
					Programs offer day-to-day guidance on an interactive calendar to keep
					you on track.
				</p>
				<div className='grid grid-cols-3 gap-4 my-8'>
					{programs.map(item => (
						<Card
							key={item.title}
							className='p-8 relative cursor-pointer group'
						>
							<h3>{item.title}</h3>
							<p className='text-sm text-muted-foreground mt-2'>{item.descr}</p>
							<Button
								size={'icon'}
								variant={'ghost'}
								className='absolute right-2 top-1/2 group-hover:translate-x-1 transition-transform'
							>
								<FaArrowRightLong />
							</Button>
						</Card>
					))}
				</div>
			</div>
		</>
	)
}

export default Home
