import KanbanBoard from '@/components/board/board'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main} style={{ backgroundColor: 'white' }}>
      <KanbanBoard></KanbanBoard>
    </main>
  )
}
