"use client";

import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner"


import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const { data: session } = useSession();

  const callAPI = (email: string) => {
    fetch("/api/recive", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast("已经成功发起邀请，请注意查收")
        } else {
          toast("发送邀请失败，可能是达到今日上限了")
        }
      });
  };

  // checking if sessions exists
  if (session) {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>确认邀请？</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex w-80 items-center gap-4">
              <Avatar>
                <AvatarImage src={session.user?.image as string} />
              </Avatar>
              <div>{session.user?.name}</div>
              <div className="truncate">{session.user?.email}</div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => signOut()} variant="ghost">
              退出
            </Button>
            <Button onClick={() => callAPI(session.user?.email as string)}>
              确认
            </Button>
          </CardFooter>
        </Card>
      </>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <Button onClick={() => signIn("github")} className="w-full">
              登录
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-80">
            <p>1. 点击登录按钮登录 Github</p>
            <p>
              2.
              由于目前刚刚发现，没有经过长期测试，不保证是否会封号，建议使用小号领取
              Copilot
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
