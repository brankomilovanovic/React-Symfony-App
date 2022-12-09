<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\HttpFoundation\JsonResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class SecurityController extends ApiController
{
    private $repository;
    private $JWTManager;

    public function __construct(UserRepository $repository, JWTTokenManagerInterface $JWTManager)
    {
        $this->repository = $repository;
        $this->JWTManager = $JWTManager;
    }

    #[Route('/api/login', methods: ['POST'])]
    public function login(Request $request)
    {
        $request = $this->transformJsonBody($request);

        $username = $request->get('username');
        $password = $request->get('password');

        $user = $this->repository->getByUsername($username);

        if($user) {
            if($user->getPassword() == $password) {
                return self::getTokenUser($user);
            }
        }

        return $this->setStatusCode(403)->respondWithMessage('Incorrect username or password!');
    }

    public function getTokenUser(User $user): JsonResponse
    {
        $payload = array_merge(['id' => $user->getId()], ['name' => $user->getName()], ['surname' => $user->getSurname()], ['email' => $user->getEmail()], ['role' => $user->getRole()]);
        return new JsonResponse(['token' => $this->JWTManager->createFromPayload($user, $payload)]);
    }
}
