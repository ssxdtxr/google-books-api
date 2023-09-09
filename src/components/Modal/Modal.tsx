import styles from './Modal.module.scss'
import {useContext, useEffect,} from "react";
import {useOutsideClick} from "@/hooks/useClickOutside.tsx";
import {AnimatePresence, motion} from "framer-motion";
import {ReactComponent as Exit} from "@/assets/img/exit.svg"
import {ModalContext} from "@/context/ModalContext.ts";


const Modal = () => {
    const {closeModal, isOpen, content} = useContext(ModalContext)

    const ref = useOutsideClick(() => {
        closeModal()
    });

    useEffect(() => {
        isOpen ? document.body.classList.add(styles.isOpenModal) : document.body.classList.remove(styles.isOpenModal)
    }, [isOpen])

    return (
        <AnimatePresence>
            {
                isOpen &&
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}

                    className={styles.back}
                >
                    <div ref={ref} className={styles.modal}>
                        <div
                            className={styles.close}
                        >
                            <Exit
                                className={styles.closeBtn}
                                width={30}
                                height={30}
                                onClick={closeModal}
                            />
                        </div>
                        <div className={styles.body}>
                            {content}
                        </div>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
};

export default Modal;