'use server'

import { createAdminClient, createSessionClient } from '@lib/server/appwrite'
import { parseStringify } from '@lib/utils'
import { cookies } from 'next/headers'
import { ID, Query } from 'node-appwrite'

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { databases } = await createAdminClient()

    const user = await databases.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )

    return parseStringify(user.documents[0])
  } catch (error) {
    console.log(error)
  }
}

export const signIn = async ({ email, password }: signInProps) => {
  try {
    // Mutation / Database / Make a fetch request to the server to sign in the user
    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password)

    cookies().set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    })

    // const user = await getUserInfo({ userId: session.userId })
    return parseStringify(session)
  } catch (error) {
    throw new Error('Failed to sign in')
  }
}

export const signUp = async ({ password, ...data }: SignUpParams) => {
  const { email, firstName, lastName } = data
  try {
    const { account } = await createAdminClient()

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    )

    const session = await account.createEmailPasswordSession(email, password)

    cookies().set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    })

    return parseStringify(newUserAccount)
  } catch (error) {
    throw new Error('Failed to sign in')
  }
}

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient()
    const user = await account.get()

    return parseStringify(user)
  } catch (error) {
    return null
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient()

    cookies().delete('appwrite-session')
    await account.deleteSession('current')
  } catch (error) {
    return null
  }
}
