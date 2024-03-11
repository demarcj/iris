'use server';

export const admin_check = async (user: string | null) => {
  return new Promise((res, rej) => {
    res(!!user);
  })
}