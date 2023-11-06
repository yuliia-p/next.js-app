import Link from 'next/link';

export default function RegisterButton() {
  return (
    <Link href="/auth/register" className="register-button">
      Register
    </Link>
  );
}
