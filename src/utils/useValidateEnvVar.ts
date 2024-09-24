export default function useValidateEnvVar(envVar: string | string[], name: string) {
  if (envVar.length === 0 || (envVar.length === 1 && envVar[0] === '')) {
    throw new Error(`${name} is not configured properly in environment variables.`);
  }
}
