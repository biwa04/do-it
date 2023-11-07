"use client";

import KanbanBoard from '@/components/board/board'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <KanbanBoard></KanbanBoard>
    </main>
  )
}
