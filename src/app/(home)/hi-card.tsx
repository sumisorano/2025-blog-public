import { useCenterStore } from '@/hooks/use-center'
import Card from '@/components/card'
import { useConfigStore } from './stores/config-store'
import { HomeDraggableLayer } from './home-draggable-layer'
import Link from 'next/link'

function getGreeting() {
	const hour = new Date().getHours()

	if (hour >= 6 && hour < 12) {
		return 'Ciallo~(∠・ω< )⌒☆，早上好'
	} else if (hour >= 12 && hour < 18) {
		return 'Ciallo~(∠・ω< )⌒☆，下午好'
	} else if (hour >= 18 && hour < 22) {
		return 'Ciallo~(∠・ω< )⌒☆，晚上好'
	} else {
		return 'Ciallo~(∠・ω< )⌒☆，晚安'
	}
}

export default function HiCard() {
	const center = useCenterStore()
	const { cardStyles, siteContent } = useConfigStore()
	const greeting = getGreeting()
	const styles = cardStyles.hiCard
    
	const username = siteContent.meta.username || '泛舟'

	const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x - styles.width / 2
	const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y - styles.height / 2

	// 新年装饰开关：改成 false 就会自动隐藏装饰
	const showChineseNewYear = true;

	return (
		<HomeDraggableLayer cardKey='hiCard' x={x} y={y} width={styles.width} height={styles.height}>
			<Card order={styles.order} width={styles.width} height={styles.height} x={x} y={y} className='relative text-center max-sm:static max-sm:translate-0'>
				
				{/* 🧧 农历新年装饰元素 */}
				{showChineseNewYear && (
					<>
						{/* 左上角的装饰（比如红灯笼或梅花） */}
						<img
							src='/images/new-year/lantern-left.png'
							alt='Chinese New Year decoration'
							className='pointer-events-none absolute'
							style={{ width: 80, left: -10, top: -20, opacity: 0.95 }}
						/>
						{/* 右下角的装饰（比如小福字或鞭炮） */}
						<img
							src='/images/new-year/lantern-right.png'
							alt='Chinese New Year decoration'
							className='pointer-events-none absolute'
							style={{ width: 70, bottom: -10, right: -10, opacity: 0.95 }}
						/>
					</>
				)}

				<Link href='/live2d'>
					<img src='/images/avatar.png' className='mx-auto rounded-full object-cover' style={{ width: 120, height: 120, boxShadow: ' 0 16px 32px -5px #E2D9CE' }} alt="avatar" />
				</Link>
				
				<h1 className='mt-5 text-2xl tracking-widest'>
					{greeting} <br /> 
					我是 <span className='text-linear text-[32px] mx-1 font-bold'>{username}</span> <br /> 
					<span className='text-lg text-gray-500 mt-2 block'>{'Ciallo～(∠・ω< )⌒☆'}</span>
				</h1>
			</Card>
		</HomeDraggableLayer>
	)
}
