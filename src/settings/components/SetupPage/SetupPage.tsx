import styles from './SetupPage.module.css';

function SetupPage({ children }: { children: React.ReactNode }){
  
    return (
        <>
            <div id="settings-page" className={styles['settings-page']}>
                { children }
            </div>
        </>
    )
}
export { SetupPage }