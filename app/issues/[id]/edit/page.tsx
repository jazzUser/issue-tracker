import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import IssueForm from '../../_components/IssueForm';

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  let issue = null;

  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      notFound(); // Handle invalid id
    }

    issue = await prisma.issue.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching issue:', error);
    notFound();
  }

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
