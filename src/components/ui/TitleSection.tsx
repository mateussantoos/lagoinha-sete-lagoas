"use client";
import { motion } from "framer-motion";

export const TitleSection = ({
  title,
  titleSerif,
  description,
}: {
  title: string;
  titleSerif?: string;
  description?: string;
}) => {
  return (
    <>
      <div>
        <motion.h2 className="text-4xl font-lato font-bold">{title}</motion.h2>
        <motion.h2 className="text-4xl font-crimson-text font-bold">
          {titleSerif}
        </motion.h2>
      </div>
      <p className="text-lg font-lato font-light">{description}</p>
    </>
  );
};
