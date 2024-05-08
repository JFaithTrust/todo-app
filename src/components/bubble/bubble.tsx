import styles from "./bubble.module.css"

const BubbleText = () => {
    return (
        <h2 className={"text-center text-5xl font-thin text-violet-300"}>
            {"Weekly Schedule".split("").map((child, idx) => (
                <span className={styles.hoverText} key={idx}>
                    {child}
                </span>
            ))}
        </h2>
    )
}
export default BubbleText