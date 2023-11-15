import styles from '@/app/page.module.css'
import GoalList from '@/components/goalList/goalList'

export default function Home() {
  return (
    <main className={styles.main} style={{ backgroundColor: 'white' }}>
      <GoalList></GoalList>
    </main>
  )
}
