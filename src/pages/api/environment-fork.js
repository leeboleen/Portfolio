import { buildClient } from '@datocms/cma-client-node';

export const config = {
  maxDuration: 300,
};

export default async function handler(request, response) {
  const authHeader = request.headers['authorization'];
  if (
    !process.env.CRON_SECRET ||
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return response.status(401).json({ success: false });
  }

  const client = buildClient({
    apiToken: process.env.DATOCMS_FULLACCESS_TOKEN,
  });

  const environments = await client.environments.list();

  const mainEnvironment = environments.find(
    environment => environment.meta.primary
  );

  if (environments.length > 7) {
    const oldestBackup = environments.filter(environment => !environment.meta.primary && environment.id.includes('cron-backup'))[0];

    if (oldestBackup) {
      await client.environments.destroy(oldestBackup.id);
    }
  }

  try {
    await client.environments.fork(mainEnvironment.id, {
      id: `cron-backup-${new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-').toLowerCase()}`,
    },
    {
      immediate_return: true,
      fast: true,
    });
  } catch (e) {
    console.log(`cron-backup-${new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-').toLowerCase()}`);
    console.log(JSON.stringify(e?.errors));

    return response.status(200).json({ success: false });
  }


  return response.status(200).json({ success: true });
}
