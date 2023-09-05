"use client";

import { Button, Card } from "flowbite-react";
import Link from "next/link";

type CardWithActionButtonProps = {
  buttonText: string;
  header: string;
  body: JSX.Element;
  route: string;
};

export default function CardWithActionButton(props: CardWithActionButtonProps) {
  return (
    <Card className="max-w-sm my-2">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>{props.header}</p>
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <p>{props.body}</p>
      </p>
      <Button as={Link} href={props.route}>
        <p>{props.buttonText}</p>
      </Button>
    </Card>
  );
}
