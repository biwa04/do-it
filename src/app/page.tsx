import KanbanBoard from '@/components/board/board'
import styles from './page.module.css'
import { AppProps } from 'next/app'

export default function Home() {
  return (
    <main className={styles.main}>
      <KanbanBoard></KanbanBoard>
    </main>
  )
}
