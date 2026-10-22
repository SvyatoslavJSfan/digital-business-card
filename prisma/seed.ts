import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not defined');
  process.exit(1);
}
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.$connect();

  const seedProfile = await prisma.profile.upsert({
    where: { slug: 'svyatoslav' },
    create: {
      slug: 'svyatoslav',
      name: 'Svyatoslav',
      description:
        'I am a software engineer with experience in building web applications.',
      skills: {
        create: [
          { name: 'JavaScript', level: 'ADVANCED' },
          { name: 'TypeScript', level: 'ADVANCED' },
          { name: 'GrapgQL', level: 'INTERMEDIATE' },
        ],
      },
      experience: {
        create: [
          {
            company: 'Tech Corp',
            position: 'Software Engineer',
            startDate: new Date('2020-01-01'),
            endDate: new Date('2023-01-01'),
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          },
        ],
      },
      projects: {
        create: [
          {
            title: 'Project Alpha',
            description: 'A web application built with React and Node.js.',
            repositoryUrl: 'https://github.com/example/project-alpha',
          },
        ],
      },
    },
    update: {},
  });
  console.log('Profile created: ', seedProfile);
  return;
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
